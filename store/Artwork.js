 Ext.define('MyDesktop.store.Artwork', {
        extend:'Ext.data.Store',
		pageSize: 8,
        model: 'MyDesktop.model.Artwork',
        proxy: {
    		type:'ajax',
			url: 'service/Artwork.php',
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
	
	
	