Injectplate
==========

A Javascript component injector.


Getting Started
=========

Start by including the required Javascript file.

```
<body>
    <script src="js/min/injectplate.min.js"></script>
</body>
```


Next initialize the Injectplate before creating your first component.

```
<script>
    // Initialize
    var $inject = new injectplate();
    
    // Create component
    $inject.component({
        name: 'article',
        className: 'example-article',
        html: [
            '<article>',
                '<h2>{{heading}}</h2>',
                '<div>{{content}}</div>',
            '</article>'
        ]
    });
</script>
```

Once the component has been created, simple bind it to an element and parse in the relevant data.

```
<script>
    // Call component
    $inject.bind({
        component: 'article',
        to: '#article-container',
        data: {
            heading: 'Great Article Heading',
            content: 'This will just be some basic text about stuff.'
        }
    });
</script>
```

If you would like to know what components have been created simply call the component list function, like so:

```
<script>
    $inject.log($inject.componentList);
</script>
```


Author
=========

Created and maintained by Chris Humboldt<br>
Website: <a href="http://chrishumboldt.com/">chrishumboldt.com</a><br>
Twitter: <a href="https://twitter.com/chrishumboldt">twitter.com/chrishumboldt</a><br>
GitHub <a href="https://github.com/chrishumboldt">github.com/chrishumboldt</a><br>


Copyright and License
=========

Copyright 2015 Savedge Project

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
