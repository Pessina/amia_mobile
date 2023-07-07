package com.amia_mobile

import com.facebook.react.bridge.NativeModule
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import android.util.Log
import com.facebook.react.bridge.Promise

class AudioModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

    override fun getName() = "AudioModule"

    @ReactMethod
    fun logAudio(name: String, location: String, promise: Promise) {
        val message = "Create event called with name runing from kotlin: $name and location: $location"
        Log.d("AudioModule", message)
        promise.resolve(message)
    }

}