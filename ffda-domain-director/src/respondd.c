/*
  Copyright (c) 2016, Matthias Schiffer <mschiffer@universe-factory.net>
  Copyright (c) 2018, David Bauer <david@darmstadt.freifunk.net>
  All rights reserved.

  Redistribution and use in source and binary forms, with or without
  modification, are permitted provided that the following conditions are met:

    1. Redistributions of source code must retain the above copyright notice,
       this list of conditions and the following disclaimer.
    2. Redistributions in binary form must reproduce the above copyright notice,
       this list of conditions and the following disclaimer in the documentation
       and/or other materials provided with the distribution.

  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
  AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
  IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
  DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
  FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
  DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
  SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
  CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
  OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
  OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/


#include <respondd.h>

#include <json-c/json.h>
#include <libgluonutil.h>

#include <uci.h>

#include <string.h>


static struct json_object * get_domain_director(void) {
	struct uci_context *ctx = uci_alloc_context();
	if (!ctx)
		return NULL;
	ctx->flags &= ~UCI_FLAG_STRICT;

	struct uci_package *p;
	if (uci_load(ctx, "ffda", &p))
		goto error;

	struct uci_section *s = uci_lookup_section(ctx, p, "director");
	if (!s)
		goto error;

	struct json_object *ret = json_object_new_object();
	json_object_object_add(ret, "enabled", gluonutil_wrap_string(uci_lookup_option_string(ctx, s, "enabled")));
	json_object_object_add(ret, "switch_enabled", gluonutil_wrap_string(uci_lookup_option_string(ctx, s, "switch_enabled")));
	json_object_object_add(ret, "switch_after", gluonutil_wrap_string(uci_lookup_option_string(ctx, s, "switch_after")));
	json_object_object_add(ret, "target", gluonutil_wrap_string(uci_lookup_option_string(ctx, s, "target")));

	uci_free_context(ctx);

	return ret;

 error:
	uci_free_context(ctx);
	return NULL;
}

static struct json_object * respondd_provider_domain_director(void) {
	struct json_object *ret = json_object_new_object();
	json_object_object_add(ret, "domain_director", get_domain_director());
	return ret;
}


const struct respondd_provider_info respondd_providers[] = {
	{"domain_director", respondd_provider_domain_director},
	{}
};
