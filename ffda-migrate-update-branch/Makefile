include $(TOPDIR)/rules.mk

PKG_NAME:=ffda-migrate-update-branch
PKG_VERSION:=v2018.1
PKG_RELEASE:=4

include $(TOPDIR)/../package/gluon.mk


define Package/ffda-migrate-update-branch
  TITLE:=Migrate autoupdater branches and settings
  DEPENDS:=+gluon-core
endef

define Package/ffda-migrate-update-branch/description
	Migrate autoupdater branches and settings away from outdated branches
endef

$(eval $(call BuildPackageGluon,ffda-migrate-update-branch))
