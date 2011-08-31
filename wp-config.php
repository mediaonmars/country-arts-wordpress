<?php
/**
 * The base configurations of the WordPress.
 *
 * This file has the following configurations: MySQL settings, Table Prefix,
 * Secret Keys, WordPress Language, and ABSPATH. You can find more information
 * by visiting {@link http://codex.wordpress.org/Editing_wp-config.php Editing
 * wp-config.php} Codex page. You can get the MySQL settings from your web host.
 *
 * This file is used by the wp-config.php creation script during the
 * installation. You don't have to use the web site, you can just copy this file
 * to "wp-config.php" and fill in the values.
 *
 * @package WordPress
 */

// ** MySQL settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define('DB_NAME', 'countryarts');

/** MySQL database username */
define('DB_USER', 'root');

/** MySQL database password */
define('DB_PASSWORD', '');

/** MySQL hostname */
define('DB_HOST', 'localhost');

/** Database Charset to use in creating database tables. */
define('DB_CHARSET', 'utf8');

/** The Database Collate type. Don't change this if in doubt. */
define('DB_COLLATE', '');

/**#@+
 * Authentication Unique Keys and Salts.
 *
 * Change these to different unique phrases!
 * You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
 * You can change these at any point in time to invalidate all existing cookies. This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define('AUTH_KEY',         'oV@} cB#>6hdQ-x6<,IB>3|O!JHw(fvQch-|!QMJd9~Aw={wi]xS+k%dN:z*# `+');
define('SECURE_AUTH_KEY',  'VB=|QF@i+#+=oHprs[=0K44MeA(vXwcYp56!([[Sh+j|9]Tmn-w3I-yp}jljvin-');
define('LOGGED_IN_KEY',    'H]+St/){!9.+xzrQPJBAzs{1G!4?l>)%wk?+0Jri-,yF-G9g*:U-c.4usGE3h3M,');
define('NONCE_KEY',        '@#+:od=.?*tG|3^%>LpD 7%;S);+k}1@)j>?o[3X^e}bIS&nH}|j#%|+VT ]`eyu');
define('AUTH_SALT',        'zn:@OTFmcmA9qqI(:G;R2$:ja8>9S-mekj%7(Dg%+wulS,>KvV)jx$)ScIkmv6|Y');
define('SECURE_AUTH_SALT', '_s2~`S|^|uaA_>!f-_S{,j_&gyinJ!8+]%NBk=`N0TUc$35Z@>%-.NjRi$#lQdix');
define('LOGGED_IN_SALT',   '.X~Kv!@`F+&kzQ73@q^[N.|oBs%YCK+uPpv9x4qla000RXtTJmRaLlMcKV>>&v+8');
define('NONCE_SALT',       '1q2>3DyeVQO!gFXkS/>4P++W|Lw)p2}q}c3$?^I];|f#$>yZq-Ng=#=tT0M#*|U$');

/**#@-*/

/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each a unique
 * prefix. Only numbers, letters, and underscores please!
 */
$table_prefix  = 'wp_';

/**
 * WordPress Localized Language, defaults to English.
 *
 * Change this to localize WordPress. A corresponding MO file for the chosen
 * language must be installed to wp-content/languages. For example, install
 * de_DE.mo to wp-content/languages and set WPLANG to 'de_DE' to enable German
 * language support.
 */
define('WPLANG', '');

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 */
define('WP_DEBUG', false);

define('WP_SITEURL', 'http://' . $_SERVER['HTTP_HOST']);
define('WP_HOME', 'http://' . $_SERVER['HTTP_HOST']);

/* That's all, stop editing! Happy blogging. */

/** Absolute path to the WordPress directory. */
if ( !defined('ABSPATH') )
	define('ABSPATH', dirname(__FILE__) . '/');

/** Sets up WordPress vars and included files. */
require_once(ABSPATH . 'wp-settings.php');

