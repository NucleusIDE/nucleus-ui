/*global Tracker*/

UltimateExpandingTree = function(nodes) {
    if (!nodes)
        return null;

    // this.setNodes(nodes);
    this.setupLocalFilesCollection(nodes);
    this.setReactiveExpandAutorun();
    return this;
};

UltimateExpandingTree.prototype.getNodeLevel = function(node) {
    var self = this;

    if (typeof node === 'undefined' || !node.get('parentId')) {
        return 1;
    }

    // return 1 + self.getNodeLevel(self.nodes[node.get('parentId')]);
    return 1 + self.getNodeLevel(self.LocalFilesCollection.findOne({filepath: node.get('parentId')}));
};

UltimateExpandingTree.prototype.setExpandAutorun = function(node) {
    if(!node) return;
    var self = this;

    Tracker.autorun(function() {
        var isExpanded = node.get('expanded');
        var target = $(document.getElementById(node.get('filepath')));

        if (isExpanded === false) {
            Tracker.nonreactive(function() {
                target.removeClass('nucleus-tree__row--expanded');

                var children = self.$getAllChildren(node);

                children.forEach(function(child) { $(child).addClass('hidden'); });
            });
        } else if (isExpanded === true) {
            Tracker.nonreactive(function() {
                target.addClass('nucleus-tree__row--expanded');

                var children = self.$getAllChildren(node);

                children.forEach(function(child) {
                    child = $(child);
                    var parent = $(document.getElementById(child.attr('data-parent-id')));
                    if (parent.hasClass('nucleus-tree__row--expanded')) {
                        child.removeClass('hidden');
                    }
                });

            });
        }

    });
};

UltimateExpandingTree.prototype.setReactiveExpandAutorun = function() {
    var self = this;

    Tracker.autorun(function() {
        var allFiles = self.LocalFilesCollection.find();

        allFiles.forEach(function (file) {
            var target = $(document.getElementById(file.get('filepath')));
            var isExpanded = file.expanded;

            if (isExpanded === false) {
                Tracker.nonreactive(function() {
                    target.removeClass('nucleus-tree__row--expanded');

                    var children = self.$getAllChildren(file);

                    children.forEach(function(child) { $(child).addClass('hidden'); });
                });
            } else if (isExpanded === true) {
                Tracker.nonreactive(function() {
                    target.addClass('nucleus-tree__row--expanded');

                    var children = self.$getAllChildren(file);

                    children.forEach(function(child) {
                        child = $(child);
                        var parent = $(document.getElementById(child.attr('data-parent-id')));
                        if (parent.hasClass('nucleus-tree__row--expanded')) {
                            child.removeClass('hidden');
                        }
                    });

                });
            }
        });

    });
};

UltimateExpandingTree.prototype.setNodes = function(nodes) {
    var self = this;
    this.nodes = {};

    nodes.forEach(function(row) {
        self.nodes[row.filepath] = new ReactiveDict();

        Object.keys(row).forEach(function(key) {
            self.nodes[row.filepath].set(key, row[key]);
        });
        row = self.nodes[row.filepath];

        if (row.get('hasChildren'))  //show icon in front of row with children
            Utils.rAdd(row, 'rowClasses', ' nucleus-tree__row--has-children ');

        //set the left-padding as per row's level
        var rowLevel = self.getNodeLevel(row);
        var padding = (rowLevel * 12) + 20;
        Utils.rAdd(row, 'styles', ";padding-left: " + padding + "px;");

        if (row.get('parentId')) {
            row.setDefault('expanded', false);
            Utils.rAdd(row, 'rowClasses', 'hidden');
        }
        self.setExpandAutorun(row);
    });
};

UltimateExpandingTree.prototype.setupLocalFilesCollection = function (filesCursor) {
    var self = this;

    this.LocalFilesCollection = new Mongo.Collection(null, {
        transform: function (mongoDoc) {
            mongoDoc.get = function (prop) {
                return mongoDoc[prop];
            }
            mongoDoc.set = function (prop, val) {
                var newProp = {};
                newProp[prop] = val;
                self.LocalFilesCollection.update({_id: mongoDoc._id}, {$set: newProp });
            }
            return mongoDoc;
        }
    });

    filesCursor.forEach(function (file) {
        var rowClasses = file.rowClasses || '';
        var rowStyles = file.rowStyles || '';

        if(file.hasChildren)
            rowClasses += ' nucleus-tree__row--has-children '

        var rowLevel = self.getNodeLevel(file);
        var padding = (rowLevel * 12) + 20;
        rowStyles += ';padding-left: ' + padding + 'px;';

        if (file.get('parentId')) {
            rowExpanded = file.expanded || false;
            rowClasses += 'hidden';
        }

        self.LocalFilesCollection.insert({
            original_id: file._id,
            filepath: file.filepath,
            type: file.type,
            parentId: file.parentId,
            name: file.name,
            hasChildren: file.hasChildren,
            appPath: file.appPath,
            updated_at: file.updated_at,
            created_at: file.created_at,
            rowClasses: rowClasses,
            styles: rowStyles,
            expanded: rowExpanded
        })
    });
}

UltimateExpandingTree.prototype.$getChildren = function(nodes) {
    if (! Array.isArray(nodes)) {
        nodes = [nodes];
    }
    var children = [];

    nodes.forEach(function(node) {
        if (!(node instanceof ReactiveDict)) {
            node = $(node); //kill two birds with one stone. Am I genius or what? /s
            node.get = node.attr.bind(node);
        }
        children = children.concat($('[data-parent-id="'+ (node.get('filepath') || node.get('id')) +'"]').toArray());
        // console.log('CHILDREN OF', node.get('filepath'), ': ', children);
    });

    return children;
};
UltimateExpandingTree.prototype.$getAllChildren = function(nodes) {
    var children = this.$getChildren(nodes);

    if (!children.length) {
        return children;
    }

    children = children.concat(this.$getAllChildren(children));
    return children;
};
