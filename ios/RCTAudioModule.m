#import <Foundation/Foundation.h>

//  RCTAudioModuleBridge.m
#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(RCTAudioModule, NSObject)

RCT_EXTERN_METHOD(logAudio:(NSString *)name location:(NSString *)location)

@end
