import { ReactElement, cloneElement } from 'react';

type TagMapping = {
  [tag: string]: ReactElement;
};

const replaceTagInText = (
  text: string,
  tag: string,
  element: ReactElement
): (string | ReactElement)[] => {
  const openTag = `<${tag}>`;
  const closeTag = `</${tag}>`;
  const parts = text.split(new RegExp(`${openTag}|${closeTag}`, 'g'));

  return parts.map((part, index) =>
    index % 2 === 0 ? part : cloneElement(element, { key: `${tag}-${index}`, children: part })
  );
};

const replaceTagsInTextRecursive = (
  textParts: (string | ReactElement)[],
  tagMapping: TagMapping
): (string | ReactElement)[] => {
  if (!Object.keys(tagMapping).length) {
    return textParts;
  }

  const tagEntries = Object.entries(tagMapping);
  const [tag, element] = tagEntries[0];
  const remainingTags = Object.fromEntries(tagEntries.slice(1));

  const replacedTextParts = textParts.flatMap((part) =>
    typeof part === 'string'
      ? replaceTagInText(part, tag, element)
      : cloneElement(
          part,
          part.props,
          replaceTagsInTextRecursive(
            Array.isArray(part.props.children) ? part.props.children : [part.props.children],
            tagMapping
          )
        )
  );

  return replaceTagsInTextRecursive(replacedTextParts, remainingTags);
};

export const replaceTagsInText = (
  text: string,
  tagMapping: TagMapping
): (string | ReactElement)[] => {
  return replaceTagsInTextRecursive([text], tagMapping);
};

export const formatCPF = (value: string) => {
  value = value.replace(/\D/g, '');

  if (value.length >= 3) {
    value = value.replace(/^(\d{3})(\d)/, '$1.$2');

    if (value.length >= 7) {
      value = value.replace(/^(\d{3}\.\d{3})(\d)/, '$1.$2');

      if (value.length >= 11) {
        value = value.replace(/^(\d{3}\.\d{3}\.\d{3})(\d{1,2})/, '$1-$2').substr(0, 14);
      }
    }
  }
  return value;
};
