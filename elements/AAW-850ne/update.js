function(instance, properties, context) {
    // Determine the element ID
    var detect_id = (properties.element_id == "This") ? instance.data.id : properties.element_id;

    // Set the threshold for inView
    inView.threshold(properties.threshold);

    // Set the offset for inView and ensure they are numbers
    const offsetValues = {
        top: Number(properties.top) || 0,
        right: Number(properties.right) || 0,
        bottom: Number(properties.bottom) || 0,
        left: Number(properties.left) || 0
    };

    // Apply the offset values
    inView.offset(offsetValues);

    $(document).ready(function() {
        // Initial state publish
        const element = document.querySelector('#' + detect_id);

        // Log the initial position of the element relative to the viewport
        const rect = element.getBoundingClientRect();

        const initialVisibility = inView.is(element);
        instance.publishState('is_visible', initialVisibility);

        // Set up inView event listeners
        inView('#' + detect_id)
            .on('enter', el => {
                instance.triggerEvent('enters_viewport', function(err) {});
                instance.publishState('is_visible', inView.is(element));
            })
            .on('exit', el => {
                instance.triggerEvent('exits_viewport', function(err) {});
                instance.publishState('is_visible', inView.is(element));
            });
    });
}
