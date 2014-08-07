 Ext.define('MyDesktop.store.ContribGrid', {
        extend:'Ext.data.Store',
		pageSize: 8,
        model: 'MyDesktop.model.ContribGrid',
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
	
	
	