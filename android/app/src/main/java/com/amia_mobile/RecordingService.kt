package com.amia_mobile

import android.app.Notification
import android.app.NotificationChannel
import android.app.NotificationManager
import android.app.Service
import android.content.Intent
import android.media.MediaRecorder
import android.os.IBinder
import android.os.Build
import android.util.Log
import java.io.IOException

public class RecordingService : Service() {

    companion object {
        private const val CHANNEL_ID = "RecordingServiceChannel"
    }

    private var recorder: MediaRecorder? = null
    private var currentFilePath: String? = null

    override fun onStartCommand(intent: Intent?, flags: Int, startId: Int): Int {
        createNotificationChannel()
        val notification = Notification.Builder(this, CHANNEL_ID)
            .setContentTitle("Recording Service")
            .setContentText("Recording audio...")
            .build()
        startForeground(1, notification)

        currentFilePath = "${getFilesDir().absolutePath}/audioRecording_${System.currentTimeMillis()}.m4a"
        recorder = MediaRecorder().apply {
            setAudioSource(MediaRecorder.AudioSource.MIC)
            setOutputFormat(MediaRecorder.OutputFormat.MPEG_4)
            setAudioEncoder(MediaRecorder.AudioEncoder.HE_AAC)
            setAudioSamplingRate(16000)
            setOutputFile(currentFilePath)
            try {
                prepare()
                start()
            } catch (e: IOException) {
                // handle error
            }
        }

        return START_STICKY
    }

    override fun onDestroy() {
        super.onDestroy()
        recorder?.apply {
            stop()
            reset()
            release()
        }
        recorder = null
        val intent = Intent("com.amia_mobile.RECORDING_STOPPED")
        intent.putExtra("filePath", currentFilePath)
        sendBroadcast(intent)
        stopForeground(true)
    }

    override fun onBind(intent: Intent?): IBinder? {
        return null
    }

    private fun createNotificationChannel() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            val serviceChannel = NotificationChannel(
                CHANNEL_ID,
                "Recording Service Channel",
                NotificationManager.IMPORTANCE_DEFAULT
            )
            val manager = getSystemService(NotificationManager::class.java)
            manager.createNotificationChannel(serviceChannel)
        }
    }
}
