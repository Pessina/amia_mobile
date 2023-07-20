import Foundation
import AVFoundation

@objc(RCTAudioModule)
class RCTAudioModule: NSObject, RCTBridgeModule {
  var recorder: AVAudioRecorder?
  var audioFileName: URL?
  
  @objc static func requiresMainQueueSetup() -> Bool { return true }
  
  static func moduleName() -> String! {
    return "RCTAudioModule"
  }

  
  func setupRecorder() {
    let recordingSession = AVAudioSession.sharedInstance()

    do {
        try recordingSession.setCategory(.playAndRecord, mode: .voiceChat, options: .defaultToSpeaker) 
        try recordingSession.setActive(true)
        
        let audioFilename = getDocumentsDirectory().appendingPathComponent("recording.m4a")
        
        let settings = [
          // TODO: Using kAudioFormatAppleLossless the size increase a lot, we can use, but we need compression
          AVFormatIDKey: Int(kAudioFormatMPEG4AAC), 
          AVSampleRateKey: 16000,    
          AVNumberOfChannelsKey: 1,
          AVEncoderAudioQualityKey: AVAudioQuality.max.rawValue,
        ]
        
        recorder = try AVAudioRecorder(url: audioFilename, settings: settings)
        self.audioFileName = audioFilename
    } catch {
        
    }
  }

  
  func getDocumentsDirectory() -> URL {
    let paths = FileManager.default.urls(for: .documentDirectory, in: .userDomainMask)
    return paths[0]
  }

  @objc(startRecording:rejecter:)
  func startRecording(resolve: @escaping RCTPromiseResolveBlock, reject: @escaping RCTPromiseRejectBlock) {
    self.setupRecorder()
    guard let recorder = self.recorder else {
      let error = NSError(domain: "", code: 200, userInfo: [NSLocalizedDescriptionKey : "Failed to set up the recorder"])
      reject("NO_RECORDER", "Recorder not found", error)
      return
    }

    recorder.record()
    resolve(true)
  }

  @objc(stopRecording:rejecter:)
  func stopRecording(resolve: @escaping RCTPromiseResolveBlock, reject: @escaping RCTPromiseRejectBlock) {
    guard let recorder = self.recorder else {
      let error = NSError(domain: "", code: 200, userInfo: [NSLocalizedDescriptionKey : "Failed to set up the recorder"])
      reject("NO_RECORDER", "Recorder not found", error)
      return
    }

    recorder.stop()
    if let audioFileName = self.audioFileName {
      resolve(audioFileName.absoluteString)
    } else {
      let error = NSError(domain: "", code: 200, userInfo: [NSLocalizedDescriptionKey : "No audio file found"])
      reject("NO_AUDIO_FILE", "Audio file not found", error)
    }
  }

  @objc(pauseRecording:rejecter:)
  func pauseRecording(resolve: @escaping RCTPromiseResolveBlock, reject: @escaping RCTPromiseRejectBlock) {
    guard let recorder = self.recorder else {
      let error = NSError(domain: "", code: 200, userInfo: [NSLocalizedDescriptionKey : "Failed to set up the recorder"])
      reject("NO_RECORDER", "Recorder not found", error)
      return
    }

    if recorder.isRecording {
      recorder.pause()
      resolve(true)
    } else {
      let error = NSError(domain: "", code: 200, userInfo: [NSLocalizedDescriptionKey : "Recorder is not recording"])
      reject("NOT_RECORDING", "Recorder is not recording", error)
    }
  }

  @objc(resumeRecording:rejecter:)
  func resumeRecording(resolve: @escaping RCTPromiseResolveBlock, reject: @escaping RCTPromiseRejectBlock) {
    guard let recorder = self.recorder else {
      let error = NSError(domain: "", code: 200, userInfo: [NSLocalizedDescriptionKey : "Failed to set up the recorder"])
      reject("NO_RECORDER", "Recorder not found", error)
      return
    }

    if !recorder.isRecording {
      recorder.record()
      resolve(true)
    } else {
      let error = NSError(domain: "", code: 200, userInfo: [NSLocalizedDescriptionKey : "Recorder is already recording"])
      reject("ALREADY_RECORDING", "Recorder is already recording", error)
    }
  }
}
