//
//  RCTAudioModule.swift
//  amia_mobile
//
//  Created by Felipe Sousa Pessina on 7/5/23.
//

import Foundation
import UIKit

@objc(RCTAudioModule)
class RCTAudioModule: NSObject, RCTBridgeModule {
  @objc static func requiresMainQueueSetup() -> Bool { return true }
  
  static func moduleName() -> String! {
    return "RCTAudioModule"
  }
  
  @objc(logAudio:location:)
  func logAudio(_ name: String, location: String) {
    let message = "Pretending to create an event \(name) at \(location) running on swift this one"
    DispatchQueue.main.async { [weak self] in
      let alert = UIAlertController(title: "Log Info", message: message, preferredStyle: .alert)
      let okayAction = UIAlertAction(title: "OK", style: .default, handler: nil)
      alert.addAction(okayAction)
      
      if var topController = UIApplication.shared.keyWindow?.rootViewController {
        while let presentedViewController = topController.presentedViewController {
          topController = presentedViewController
        }
        topController.present(alert, animated: true, completion: nil)
      }
    }
  }
}
