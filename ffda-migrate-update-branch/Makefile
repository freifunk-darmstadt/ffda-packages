include $(TOPDIR)/rules.mk

PKG_NAME:=ffda-migrate-update-branch
PKG_VERSION:=v2018.1
PKG_RELEASE:=1

PKG_BUILD_DIR := $(BUILD_DIR)/$(PKG_NAME)

include ../gluon.mk

define Package/ffda-migrate-update-branch
  TITLE:=Migrate autoupdater branch name
  DEPENDS:=+gluon-core
endef

define Package/ffda-migrate-update-branch/description
	Migrate autoupdater branch name from experimental to testing
endef

$(eval $(call BuildPackage,ffda-migrate-update-branch))
