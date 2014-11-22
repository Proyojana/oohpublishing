 Ext.define('MyDesktop.store.AuthorGrid', {
        extend:'Ext.data.Store',
		pageSize: 20,
        model: 'MyDesktop.model.AuthorGrid',
        proxy: {
    		type:'ajax',
			url: 'service/Author.php',
			actionMethods: {
		     read: 'POST'
    		},
    			extraParams:{action:2},
    		reader: {
				type:'json',
	        	root: 'results',
    	    	totalProperty: 'total'
    		}
		},
    });
	
	//employee.load({params:{start: 0, limit: 50}});
	
	
	