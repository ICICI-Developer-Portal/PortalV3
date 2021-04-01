$(document).ready(function () {
            if ($(window).width() < 768) {
                $('#ourAPIs.owl-carousel').owlCarousel({
                    responsive: {
                        0: {
                            items: 1,
                        }
                    }
                });
            } else {
                $('#ourAPIs.owl-carousel').owlCarousel({
                    mouseDrag: false,
                    responsive: {
                        0: {
                            items: 3
                        }
                    }
                });
            }
        });
        $(document).ready(function () {
            if ($(window).width() < 768) {
                $('.owl-carousel').owlCarousel({
                    responsive: {
                        0: {
                            items: 1,
                        }
                    }
                });
            } else {
                $('.owl-carousel').owlCarousel({
                    mouseDrag: false,
                    responsive: {
                        0: {
                            items: 4
                        }
                    }
                });
            }
        });
        $(document).ready(function () {
            if ($(window).width() < 768) {
                $('#availableAPIs.owl-carousel').owlCarousel({
                    responsive: {
                        0: {
                            items: 1,
                        }
                    }
                });
            } else {
                $('#availableAPIs.owl-carousel').owlCarousel('destroy');
            }
        });
        $('#openDocumentationModal').click(function(){
            setTimeout(function () {
                $("#documentationModal i").click()
        }, 5000);
        });