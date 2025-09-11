<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the installation.
 * You don't have to use the website, you can copy this file to "wp-config.php"
 * and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * Database settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://developer.wordpress.org/advanced-administration/wordpress/wp-config/
 *
 * @package WordPress
 */

// ** Database settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define( 'DB_NAME', 'wordpress_db' );

/** Database username */
define( 'DB_USER', 'root' );

/** Database password */
define( 'DB_PASSWORD', '' );

/** Database hostname */
define( 'DB_HOST', 'localhost' );

/** Database charset to use in creating database tables. */
define( 'DB_CHARSET', 'utf8mb4' );

/** The database collate type. Don't change this if in doubt. */
define( 'DB_COLLATE', '' );

/**#@+
 * Authentication unique keys and salts.
 *
 * Change these to different unique phrases! You can generate these using
 * the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}.
 *
 * You can change these at any point in time to invalidate all existing cookies.
 * This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define( 'AUTH_KEY',         'ylvAtR:uSHwj3C#g[ceg>T}mV)bNMuKbOQ{gwXGLU4N<De:Q-]R^A;$AZ%jlRWZb' );
define( 'SECURE_AUTH_KEY',  'ma-`BVzsNW#@z__uUx+ 2&^d#48fPb~QFmF<4 ?WtnE7zBpwK E(o*?9hx~n)$ #' );
define( 'LOGGED_IN_KEY',    '3.`l$:>:,P*pf=2@G6_q<OPfEEC_=e|gyH9]lFX#|ev~c5z6l) wC^Tw--{/zGA,' );
define( 'NONCE_KEY',        's7&<0q0`FYlCTB,Lh+c]Ux.nZN/M3mXxHOQk^09l$CC?ZVf%DxVQ[f&m3,f~YloQ' );
define( 'AUTH_SALT',        '(Sl1P8>ws.@MyytsC6?Y!.7P|U>m ]CY*K<a}U9SSWxlpn6>ESS 03,t>rH[{p+G' );
define( 'SECURE_AUTH_SALT', 'W*k$pY;tT8iC6YoO{GtQF>6!J`A-#hkjCtvDbq>xn8VS|CMRlCZ [Yr&ro)KR+0h' );
define( 'LOGGED_IN_SALT',   '0qV>QvAp*bD3MQ.Ry[ps/;W@0Z-BnER%jruXp.R;Y|Rzp|=bgN>R(EQu/og@JY^.' );
define( 'NONCE_SALT',       'Q:Im.-%4K92pXRi%&y!`{x5fwKFNHx$jks|KNOBPT>3kSrG3BP.a2iV?fgdV%WWh' );

/**#@-*/

/**
 * WordPress database table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 *
 * At the installation time, database tables are created with the specified prefix.
 * Changing this value after WordPress is installed will make your site think
 * it has not been installed.
 *
 * @link https://developer.wordpress.org/advanced-administration/wordpress/wp-config/#table-prefix
 */
$table_prefix = 'wp_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the documentation.
 *
 * @link https://developer.wordpress.org/advanced-administration/debug/debug-wordpress/
 */
define( 'WP_DEBUG', false );

/* Add any custom values between this line and the "stop editing" line. */



/* That's all, stop editing! Happy publishing. */

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', __DIR__ . '/' );
}

/** Sets up WordPress vars and included files. */
require_once ABSPATH . 'wp-settings.php';
