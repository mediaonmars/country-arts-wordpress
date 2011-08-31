<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html>
  <head>
    <meta content='text/html; charset=UTF-8' http-equiv='Content-Type'>
      <title>Country Arts WA</title>
      <link href='<?php bloginfo('stylesheet_url'); ?>' rel='stylesheet' type='text/css' />
      <script src='<?php bloginfo('template_directory'); ?>/javascripts/lib.js' type='text/javascript'></script>
      <script src='<?php bloginfo('template_directory'); ?>/javascripts/jquery-1.6.2.min.js' type='text/javascript'></script>
      <script src='<?php bloginfo('template_directory'); ?>/javascripts/script.js' type='text/javascript'></script>
      <script src='<?php bloginfo('template_directory'); ?>/javascripts/marsfx.js' type='text/javascript'></script>
    </meta>
  </head>
  <body>
    <div id='header'>
      <!-- jQuery handles to place the header background images -->
      <div id='headerimgs'>
        <div class='headerimg' id='headerimg1'></div>
        <div class='headerimg' id='headerimg2'></div>
      </div>
      <!-- Top navigation on top of the images -->
      <div id='nav-outer'>
        <div id='navigation'>
          <div id='menu'>
            <ul>
              <?php wp_list_pages('sort_column=menu_order&depth=2&title_li=');?>
            </ul>
          </div>
          <!-- menu -->
          <div id='search'>
            <form>
              <input class='mars-search-clear' id='searchtxt' type='text' value='Search' />
              <input class='searchbtn' type='submit' value='' />
            </form>
          </div>
          <!-- search -->
        </div>
        <!-- navavigation -->
      </div>
      <!-- nav-outer -->
    </div>
    <!-- header -->
    <div id='content'>
      