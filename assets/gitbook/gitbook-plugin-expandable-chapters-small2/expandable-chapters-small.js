require(['gitbook', 'jQuery'], function (gitbook, $) {
    var PLUGIN = 'expandable-chapter-small2',
        TOGGLE_CLASSNAME = 'expanded',
        CATEGORY = '.category',
        CATEGORY_TITLE = '.category-title',
        POST_TITLE = '.post-title',
        POST = '.post';

    var init = function () {
        // adding the trigger element to each ARTICLES parent and binding the event
        var config = gitbook.state.config.pluginsConfig || {};
        var articlesExpand = false;
        if (config && config[PLUGIN]) {
            articlesExpand = config[PLUGIN].articlesExpand || false;
        }
        if (articlesExpand) {
            $(CATEGORY_TITLE)
                .css('cursor', 'pointer')
                .on('click', function (e) {
                    e.preventDefault();
                    e.stopPropagation();
                    toggle($(e.target).closest(CATEGORY));
                });
            $(POST_TITLE)
                .css('cursor', 'pointer')
                .on('click', function (e) {
                    toggle($(e.target).closest(POST));
                });
        }
    };

    var toggle = function ($category) {
        if ($category.hasClass('expanded')) {
            collapse($category);
        } else {
            expand($category);
        }
    };

    var collapse = function ($category) {
        if ($category.length && $category.hasClass(TOGGLE_CLASSNAME)) {
            $category.removeClass(TOGGLE_CLASSNAME);
            $category.find('ul').css('display', 'none');
        }
    };

    var expand = function ($category) {
        if ($category.length && !$category.hasClass(TOGGLE_CLASSNAME)) {
            $category.addClass(TOGGLE_CLASSNAME);
            $category.find('ul').css('display', 'block');
        }
    };

    gitbook.events.bind('page.change', function () {
        init();
    });
});
