include $(TOPDIR)/rules.mk

PKG_NAME:=ffda-geolocator
PKG_VERSION:=1
PKG_RELEASE:=1

include $(TOPDIR)/../package/gluon.mk

define Package/ffda-geolocator
  TITLE:=FFDA Geolocator
  DEPENDS:=+ffda-location
endef

define Package/ffda-geolocator/description
	Provides WiFi based positioning
endef

$(eval $(call BuildPackageGluon,ffda-geolocator))
