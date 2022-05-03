package com.orange.pingheng.generated;

import java.util.Arrays;
import java.util.List;


public class BasePackageList {
  public List<Package> getPackageList() {
    return Arrays.<Package>asList(
        new expo.modules.constants.ConstantsPackage(),
        new expo.modules.crypto.CryptoPackage(),
        new expo.modules.filesystem.FileSystemPackage(),
        new expo.modules.imageloader.ImageLoaderPackage(),
        new expo.modules.permissions.PermissionsPackage(),
        new expo.modules.securestore.SecureStorePackage(),
        new expo.modules.splashscreen.SplashScreenPackage(),
        new expo.modules.webbrowser.WebBrowserPackage()
    );
  }
}
