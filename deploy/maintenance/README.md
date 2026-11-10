# Maintenance mode — eedresearch.com

Takes the public site offline behind a static "under maintenance" page, served
by Apache. The Next.js app and its PM2 process are left running and untouched,
so there is no rebuild (and no OOM risk on the 1GB droplet) either way.

Requests get **HTTP 503** with a `Retry-After`, which is the correct status for
a temporary outage — search engines hold the existing index rather than
dropping the pages.

## SSH access

The commands below use an SSH alias, `eed-droplet`, so no server details live
in this public repository. Define it once in your own `~/.ssh/config` with the
values from the maintainer:

    Host eed-droplet
      HostName <droplet IP address>
      User <admin user>
      IdentityFile <path to your private key>

## Turn maintenance ON

    ssh eed-droplet \
      'mv /etc/apache2/eed-maintenance-off/maintenance.conf /etc/apache2/eed-maintenance/ && apache2ctl configtest && systemctl reload apache2'

## Turn maintenance OFF (restore the site)

    ssh eed-droplet \
      'mv /etc/apache2/eed-maintenance/maintenance.conf /etc/apache2/eed-maintenance-off/ && apache2ctl configtest && systemctl reload apache2'

`reload` is graceful — it does not drop the other sites on the shared server.

## Files on the droplet

| Path | What it is |
|---|---|
| `/var/www/maintenance/` | the page and logo (copies of this folder) |
| `/etc/apache2/eed-maintenance/` | active: holds `maintenance.conf` when ON |
| `/etc/apache2/eed-maintenance-off/` | parked: holds it when OFF |

Both eedresearch.com vhosts (`:80` and `:443`) carry one line,
`IncludeOptional /etc/apache2/eed-maintenance/*.conf`, placed above their
`ProxyPass` directives.

## Editing the page

Edit `index.html` here, commit, then re-copy it up:

    scp index.html logo.png eed-droplet:/var/www/maintenance/

No Apache reload needed for a content-only change.
