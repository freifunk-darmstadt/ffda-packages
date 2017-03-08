include $(TOPDIR)/rules.mk

PKG_NAME:=ffda-update-stabilizer
PKG_VERSION:=1
PKG_RELEASE:=1

PKG_BUILD_DIR := $(BUILD_DIR)/$(PKG_NAME)

include $(INCLUDE_DIR)/package.mk

define Package/ffda-update-stabilizer
  SECTION:=gluon
  CATEGORY:=Gluon
  TITLE:=Update autoupdater branches to something more stable.
  DEPENDS:=+gluon-core
endef

define Package/ffda-update-stabilizer/description
	Switches the autoupdater branch to stable, if condition is met.
endef

define Build/Prepare
	mkdir -p $(PKG_BUILD_DIR)
endef

define Build/Configure
endef

define Build/Compile
endef

define Package/ffda-update-stabilizer/install
	$(CP) ./files/* $(1)/
endef

$(eval $(call BuildPackage,ffda-update-stabilizer))
