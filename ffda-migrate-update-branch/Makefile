include $(TOPDIR)/rules.mk

PKG_NAME:=ffda-migrate-update-branch
PKG_VERSION:=v2018.1
PKG_RELEASE:=1

include $(TOPDIR)/../package/gluon.mk


define Package/ffda-migrate-update-branch
  TITLE:=Migrate autoupdater branch name
  DEPENDS:=+gluon-core
endef

define Package/ffda-migrate-update-branch/description
	Migrate autoupdater branch name from experimental to testing
endef

$(eval $(call BuildPackageGluon,ffda-migrate-update-branch))
