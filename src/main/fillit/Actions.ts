import { ActionScript } from '../ActionExecutor';

export module aiscripts {

	
  /**
	 * 線のオプションを
	 * - 線の幅 9pt
	 * - 線端 丸
	 * - 角の形状 丸
	 * - 線の位置 外側
	 * 
	 * へ変更するアクション。線の位置がスクリプトだけでは変更できないためアクションを使用している
	 */
	export const ChangeStrokeSide: ActionScript = {
		name: "Center",
		folder: "ChangeStrokeSide",
		script: `/version 3
/name [ 16
	4368616e67655374726f6b6553696465
]
/isOpen 1
/actionCount 1
/action-1 {
	/name [ 6
		43656e746572
	]
	/keyIndex 0
	/colorIndex 0
	/isOpen 1
	/eventCount 1
	/event-1 {
		/useRulersIn1stQuadrant 0
		/internalName (ai_plugin_setStroke)
		/localizedName [ 12
			e7b79ae38292e8a8ade5ae9a
		]
		/isOpen 1
		/isOn 1
		/hasDialog 0
		/parameterCount 9
		/parameter-1 {
			/key 2003072104
			/showInPalette 4294967295
			/type (unit real)
			/value 9.0
			/unit 592476268
		}
		/parameter-2 {
			/key 1667330094
			/showInPalette 4294967295
			/type (enumerated)
			/name [ 12
				e4b8b8e59e8be7b79ae7abaf
			]
			/value 1
		}
		/parameter-3 {
			/key 1785686382
			/showInPalette 4294967295
			/type (enumerated)
			/name [ 18
				e383a9e382a6e383b3e38389e7b590e59088
			]
			/value 1
		}
		/parameter-4 {
			/key 1684825454
			/showInPalette 4294967295
			/type (integer)
			/value 0
		}
		/parameter-5 {
			/key 1684104298
			/showInPalette 4294967295
			/type (boolean)
			/value 0
		}
		/parameter-6 {
			/key 1634231345
			/showInPalette 4294967295
			/type (ustring)
			/value [ 8
				5be381aae381975d
			]
		}
		/parameter-7 {
			/key 1634231346
			/showInPalette 4294967295
			/type (ustring)
			/value [ 8
				5be381aae381975d
			]
		}
		/parameter-8 {
			/key 1634230636
			/showInPalette 4294967295
			/type (enumerated)
			/name [ 24
				e38391e382b9e381aee7b582e782b9e381abe9858de7bdae
			]
			/value 0
		}
		/parameter-9 {
			/key 1634494318
			/showInPalette 4294967295
			/type (enumerated)
			/name [ 6
				e5a496e581b4
			]
			/value 2
		}
	}
}`

	}
}