include $(TOPDIR)/rules.mk

PKG_NAME:=ffda-migrate-update-branch
PKG_VERSION:=2
PKG_RELEASE:=1

PKG_BUILD_DIR := $(BUILD_DIR)/$(PKG_NAME)

include $(INCLUDE_DIR)/package.mk

define Package/ffda-migrate-update-branch
  SECTION:=gluon
  CATEGORY:=Gluon
  TITLE:=Migrate autoupdater branch name
  DEPENDS:=+gluon-core
endef

define Package/ffda-migrate-update-branch/description
	Migrate autoupdater branch name from experimental to testing
endef

define Build/Prepare
	mkdir -p $(PKG_BUILD_DIR)
endef

define Build/Configure
endef

define Build/Compile
endef

define Package/ffda-migrate-update-branch/install
	$(CP) ./files/* $(1)/
endef

$(eval $(call BuildPackage,ffda-migrate-update-branch))
