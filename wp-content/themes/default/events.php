
        <?php
        /*
         * 
         * 
         * Template Name: Events
         * 
         * 
         */
        ?>
        <?php get_header(); ?>
        
          <?php if (have_posts()) : ?>
            <?php while (have_posts()) : the_post(); ?>
            <?php
              $category = $_REQUEST['region'];
            ?>
            
            
            <?php the_content(); ?>
            <?php echo do_shortcode('[eventlist categories="' . $category . '"]'); ?>
            <?php endwhile; ?>
           <?php endif; ?>
          
        <?php get_footer(); ?>
        