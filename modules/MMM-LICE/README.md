Fork from MMM-LICE

## Installation

- `git clone https://github.com/jayjodev/MMM-LICE` into the `~/MagicMirror/modules` directory.

- Get your free API Access Key from https://currencylayer.com/ (Free plan) 250 / a month

- No dependencies needed! No kidding!

## Config.js entry and options

    	{
    		module: 'MMM-LICE',
    		position: 'top_right',                 // Best in left, center, or right regions
    		config: {
    			accessKey: "",
    			 // Free account & API Access Key at currencylayer.com
    			source: "USD",                    // USD unless you upgrade from free account
    			symbols: "KRW,CAD,EUR",      // Currency symbols
    			header: "Exchange Rate",
    			updateInterval: 12 * 60 * 60 * 1000,
    			timeLocation: "Asia/Seoul"
    	}

## SpaceCowboysDude is outta round but he always fixes my mistakes
