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
    index % 2 === 0 ? part : cloneElement(element, { key: index, children: part })
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
