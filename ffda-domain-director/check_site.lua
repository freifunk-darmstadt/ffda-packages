need_boolean(in_site({'domain_director', 'enabled',}), 0)
need_boolean(in_site({'domain_director', 'switch_enabled',}), 0)
need_string(in_site({'domain_director', 'url',}))
need_number(in_site({'domain_director', 'switch_after_offline',}), -1)
