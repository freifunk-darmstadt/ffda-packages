include $(TOPDIR)/rules.mk

PKG_NAME:=ffda-update-stabilizer
PKG_VERSION:=2018.1
PKG_RELEASE:=2

include $(TOPDIR)/../package/gluon.mk


define Package/ffda-update-stabilizer
  TITLE:=Migrate devices that were added since the last major release to the stable branch.
  DEPENDS:=+gluon-core
endef

define Package/ffda-update-stabilizer/description
	Device support is primarily added to the master branch. When a new stable version
	hits we would like those devices to automatically migrate to a stable release, as
	soon as one is available. Therefore this package migrates the autoupdater branch
	for a certain list of devices.
endef

$(eval $(call BuildPackageGluon,ffda-update-stabilizer))
