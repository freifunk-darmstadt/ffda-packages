include $(TOPDIR)/rules.mk

PKG_NAME:=gluon-purge-contact-info
PKG_VERSION:=1

PKG_BUILD_DIR := $(BUILD_DIR)/$(PKG_NAME)

define Package/gluon-purge-contact-info
  SECTION:=gluon
  CATEGORY:=Gluon
  TITLE:=Purge contact information from uci
endef

define Package/gluon-purge-contact-info/description
	This packages purges contact information from uci.
endef

define Build/Prepare
	mkdir -p $(PKG_BUILD_DIR)
endef

define Build/Configure
endef

define Build/Compile
endef

define Package/gluon-purge-contact-info/install
	$(CP) ./files/* $(1)/
endef

$(eval $(call BuildPackage,gluon-purge-contact-info))

