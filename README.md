# AstraEditor Mobile

A mobile app of AstraEditor

## Prerequisites

- Android SDK + NDK (API 34, NDK 27+)
- JDK 17 or 21
- Rust Android targets: `aarch64-linux-android`, `armv7-linux-androideabi`, `x86_64-linux-android`, `i686-linux-android`
- `cargo-ndk`
<!-- 
**Environment setup guides:**
- [Tauri v2 Android Setup](https://v2.tauri.app/start/prerequisites/) — official prerequisites for all platforms
- [Android Studio](https://developer.android.com/studio) — recommended for managing SDK/NDK
- [Rust Android targets](https://rust-lang.github.io/rustup/cross-compilation.html) — `rustup target add aarch64-linux-android armv7-linux-androideabi x86_64-linux-android i686-linux-android`

Make sure `ANDROID_HOME`, `NDK_HOME` and `JAVA_HOME` environment variables are set correctly, and `platform-tools` is on your `PATH`. -->

## Development

``` bash
cd Desktop
pnpm install
cd mobile
pnpm tauri android init
```

For Desktop development, run:
``` bash
pnpm tauri dev
```
For Android development, run:
``` bash
pnpm tauri android dev
```