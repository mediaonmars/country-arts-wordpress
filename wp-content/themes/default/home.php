
      <?php
      /*
       * 
       * 
       * Template Name: Home
       * 
       * 
       */
      ?>
      <?php get_header("home"); ?>
        <div id="content">
      
          <div id="home-left">
              
            <p>Country Arts WA is a dynamic and flexible not-for-profit, membership based organisation focused on supporting arts and cultural development across regional Western Australia.        </p>
            <p>The role of Country Arts WA is to enable and empower regional Western Australians to develop and enrich their communities through engagement with culture and the arts.            </p>
            <p>Country Arts WA delivers a range of arts development and performing arts touring programs on behalf of the State and Federal governments. These include funding for arts projects, large and small, support for key regional arts organisations, youth specific projects, and an extensive professional performing arts touring program. </p>
            <img src="images/icons.png" alt="Country Arts WA" width="346" height="52" class="icons-home">
          
          </div><!--home-left-->
      	
        	<div id="home-right">
            <img src="/images/map.png" width="490" height="575" id='wa' usemap='#wamap' />
            <map id="wamap" name="wamap">
              <area shape="poly" coords="487,198,403,198,402,155,341,152,334,158,281,158,257,169,227,161,266,152,292,126,305,115,298,94,320,70,336,91,343,84,336,63,361,66,367,36,393,17,411,4,440,4,463,24,490,28"  alt="kimberley" href="#kimberley" id="kimberley" />
              <area shape="poly" coords="484,198,484,257,205,256,187,254,178,263,160,263,154,256,133,259,129,267,118,254,105,258,97,247,106,237,101,220,146,185,192,178,219,168,238,166,265,166,279,161,331,158,397,156,401,197"  alt="pilbara" href="#pilbara" id="pilbara" />
              <area shape="poly" coords="80,224,75,236,81,248,68,274,75,302,90,319,91,330,77,340,86,359,112,355,117,353,127,318,140,315,150,310,166,317,181,305,178,290,180,264,160,266,152,259,140,261,133,270,119,258,106,259,96,246,103,235,100,222,88,236"  alt="gascoyne" href="#gascoyne" id="gascoyne" />
              <area shape="poly" coords="182,264,181,309,164,316,151,313,131,319,119,334,115,359,89,360,104,399,115,436,141,439,141,428,200,421,202,406,208,415,231,410,245,385,244,358,288,358,292,347,363,345,366,260,199,261,187,257"  alt="mid-west" href="#mid-west" id="mid-west" />
              <area shape="poly" coords="368,261,489,266,476,455,481,472,406,492,355,508,341,531,235,543,234,528,240,521,240,437,204,424,204,410,214,417,235,409,248,387,249,363,289,362,293,350,314,350,367,351"  alt="goldfields" href="#goldfields" id="goldfields" />
              <area shape="poly" coords="115,439,145,440,145,429,202,425,239,433,242,521,229,527,221,527,218,520,157,531,152,530,143,528,150,506,141,491,147,479,127,473,118,455"  alt="wheatbelt" href="#wheatbelt" id="wheatbelt" />
              <area shape="poly" coords="125,473,125,512,147,514,149,509,140,493,143,481"  alt="peel" href="#peel" id="peel" />
              <area shape="poly" coords="123,515,116,525,110,543,117,561,145,570,158,569,154,533,142,531,143,517"  alt="south-west" href="#south-west" id="south-west" />
              <area shape="poly" coords="156,532,161,569,190,569,230,544,228,529,220,528,216,523"  alt="great-southern" href="#great-southern" id="great-southern" />
            </map>
                  
            </div><!--home-right-->
      </div>
      <script type='text/javascript'>
        //<![CDATA[
          var RegionEvents = <?php echo get_events_json_by_category(4); ?>
        //]]>
      </script>
      <?php get_footer("home"); ?>
      