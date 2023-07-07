package com.amia_mobile

import android.media.MediaRecorder
import com.facebook.react.bridge.*
import java.io.IOException

class AudioModule(private val reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

    private var recorder: MediaRecorder? = null
    private var currentFilePath: String? = null

    override fun getName(): String {
        return "AudioModule"
    }

    @ReactMethod
    fun startRecording(promise: Promise) {
        currentFilePath = "${reactContext.filesDir.absolutePath}/audioRecording_${System.currentTimeMillis()}.mp4"

        recorder = MediaRecorder().apply {
            setAudioSource(MediaRecorder.AudioSource.MIC)
            setOutputFormat(MediaRecorder.OutputFormat.MPEG_4)
            setAudioEncoder(MediaRecorder.AudioEncoder.AMR_WB)
            setOutputFile(currentFilePath)
            try {
                prepare()
                start()
                promise.resolve(null)
            } catch (e: IOException) {
                promise.reject("START_RECORDING_FAILED", e)
            }
        }
    }

    @ReactMethod
    fun stopRecording(promise: Promise) {
        try {
            recorder?.apply {
                stop()
                reset()
                release()
            }
            recorder = null
            promise.resolve(currentFilePath)
        } catch (e: RuntimeException) {
            promise.reject("STOP_RECORDING_FAILED", e)
        }
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
