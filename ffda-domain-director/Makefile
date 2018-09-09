include $(TOPDIR)/rules.mk

PKG_NAME:=ffda-domain-director
PKG_VERSION:=1
PKG_RELEASE:=1

PKG_BUILD_DEPENDS := respondd
PKG_BUILD_DIR := $(BUILD_DIR)/$(PKG_NAME)

include $(INCLUDE_DIR)/package.mk

define Package/ffda-domain-director
  SECTION:=gluon
  CATEGORY:=Gluon
  TITLE:=Direct nodes into their corresponding mesh-domain
  DEPENDS:=+gluon-core +libiwinfo +luaposix
endef

define Package/ffda-domain-director/description
	Direct nodes into their corresponding mesh-domain based on their location.
endef

define Build/Prepare
	mkdir -p $(PKG_BUILD_DIR)
	$(CP) ./src/* $(PKG_BUILD_DIR)/
endef

define Build/Configure
endef

define Build/Compile
	$(call Build/Compile/Default)
endef

define Package/ffda-domain-director/install
	$(CP) ./luasrc/* $(1)/
	$(CP) ./files/* $(1)/

	$(INSTALL_DIR) $(1)/usr/lib/respondd
	$(CP) $(PKG_BUILD_DIR)/respondd.so $(1)/usr/lib/respondd/domain_director.so
endef

define Package/ffda-domain-director/postinst
	#!/bin/sh
	$(call GluonCheckSite,check_site.lua)
endef

$(eval $(call BuildPackage,ffda-domain-director))
