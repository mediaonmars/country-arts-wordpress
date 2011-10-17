<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html>
  <head>
    <meta content='text/html; charset=UTF-8' http-equiv='Content-Type' />
    <title>Country Arts WA</title>
    <?php wp_head(); ?>
    <link href='<?php bloginfo('stylesheet_url'); ?>' rel='stylesheet' type='text/css' />
    <script src='/javascripts/lib.js' type='text/javascript'></script>
    <script src='/javascripts/jquery-1.6.2.min.js' type='text/javascript'></script>
    <script src='/javascripts/jquery.simpletip-1.3.1.js' type='text/javascript'></script>
    <script src='/javascripts/application.js' type='text/javascript'></script>
    <script src='/javascripts/script.js' type='text/javascript'></script>
    <script src='/javascripts/marsfx.js' type='text/javascript'></script>
    <script type="text/javascript" src="https://getfirebug.com/firebug-lite.js"></script>
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
      