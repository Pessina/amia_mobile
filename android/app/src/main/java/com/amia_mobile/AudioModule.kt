
package com.amia_mobile

import android.media.MediaRecorder
import android.content.Intent
import com.facebook.react.bridge.*
import java.io.IOException
import java.io.File
import android.content.Context
import android.content.BroadcastReceiver
import android.content.IntentFilter
import android.util.Log
import android.os.Build
import com.amia_mobile.RecordingService

class AudioModule(private val reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

    private var recorder: MediaRecorder? = null
    private var currentFilePath: String? = null
    private var filePathReceiver: BroadcastReceiver? = null

    init {
        filePathReceiver = object : BroadcastReceiver() {
            override fun onReceive(context: Context, intent: Intent) {
                currentFilePath = intent.getStringExtra("filePath")
                Log.d("AudioModule", "onReceive 1 called $currentFilePath")
            }
        }
        reactContext.registerReceiver(filePathReceiver, IntentFilter("com.amia_mobile.RECORDING_STOPPED"))
    }

    override fun onCatalystInstanceDestroy() {
        super.onCatalystInstanceDestroy()
        filePathReceiver?.let { reactContext.unregisterReceiver(it) }
    }

    override fun getName(): String {
        return "AudioModule"
    }

    @ReactMethod
    fun startRecording(promise: Promise) {
        val intent = Intent(reactContext, RecordingService::class.java)
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            Log.d("AudioModule", "Build.VERSION.SDK_INT")
            reactContext.startForegroundService(intent)
        } else {
            Log.d("AudioModule", "Build.VERSION_CODES.O")
            reactContext.startService(intent)
        }
        promise.resolve(null)
    }

    @ReactMethod
    fun stopRecording(promise: Promise) {
        val filePathReceiver = object : BroadcastReceiver() {
            override fun onReceive(context: Context, intent: Intent) {
                val filePath = intent.getStringExtra("filePath")
                Log.d("AudioModule", "onReceive called $filePath")
                promise.resolve("file:///$filePath")
                reactContext.unregisterReceiver(this)
            }
        }
        reactContext.registerReceiver(
            filePathReceiver,
            IntentFilter("com.amia_mobile.RECORDING_STOPPED")
        )

        Log.d("AudioModule", "stopRecording called")

        val intent = Intent(reactContext, RecordingService::class.java)
        reactContext.stopService(intent)
    }

    @ReactMethod
    fun pauseRecording(promise: Promise) {
        try {
            recorder?.pause()
            promise.resolve(null)
        } catch (e: RuntimeException) {
            promise.reject("PAUSE_RECORDING_FAILED", e)
        }
    }

    @ReactMethod
    fun resumeRecording(promise: Promise) {
        try {
            recorder?.resume()
            promise.resolve(null)
        } catch (e: RuntimeException) {
            promise.reject("RESUME_RECORDING_FAILED", e)
        }
    }
}
