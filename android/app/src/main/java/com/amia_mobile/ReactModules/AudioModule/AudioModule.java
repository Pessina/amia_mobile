package com.amia_mobile;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import java.util.Map;
import java.util.HashMap;
import android.widget.Toast;
import android.app.AlertDialog;
import com.facebook.react.bridge.UiThreadUtil;

public class AudioModule extends ReactContextBaseJavaModule {
    AudioModule(ReactApplicationContext context) {
        super(context);
    }

    @Override
    public String getName() {
        return "AudioModule";
    }

    @ReactMethod
    public void logAudio(String name, String location) {
        final String message = "Create event called with name: " + name + " and location: " + location;

        UiThreadUtil.runOnUiThread(new Runnable() {
            @Override
            public void run() {
                new AlertDialog.Builder(getCurrentActivity())
                        .setTitle("Event Info")
                        .setMessage(message)
                        .setPositiveButton(android.R.string.ok, null)
                        .show();
            }
        });
    }

}