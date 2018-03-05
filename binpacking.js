function pack() {
	while (bags.length > packedBags) {
		var packer = new BinPacking(containerSize.w, containerSize.h, containerSize.d);
		if (containers === 0) {
			// console.log("Box number: ", containers);
			packer.pack(bags);
		} else {
			// console.log("Box number: ", containers);
			// console.log(noFit);
			packer.pack(noFit);
		}
		containers++;
	}

	console.log("Total bags: ", bags.length);
	console.log("Packed bags: ", packedBags);
	console.log("Number of boxes needed: ", containers);
}

function BinPacking(w, h, d) {
	this.root = {
		x: 0,
		y: 0,
		z: 0,
		w: w,
		h: h,
		d: d
	};

	this.pack = function (blocks) {

		while (this.root.y <= containerSize.d) {
			var n, node, block;
			noFit = [];
			var current = {
				w: blocks[0].w,
				h: blocks[0].h,
				d: blocks[0].d
			};
			// console.log(current);

			for (n = 0; n < blocks.length; n++) {
				//	block = blocks[n];

				block = blocks[n];
				// console.log("The block is: ", block);

				if (node = this.getNode(this.root, block.w, block.h, block.d, "first")) {
					//console.log(node);
					block.fit = this.divideTree(node, block.w, block.h, block.d, current);
				} else {
					noFit.push(block);
				}
			}
			// console.log("noFit", noFit);
			// console.log("fit", fit);

			if (noFit.length > 0) {
				// console.log(noFit.length);
				blocks = noFit;
				//console.log(this.root);
				this.root = {
					x: this.root.x,
					y: this.root.y + current.d,
					z: this.root.z,
					w: this.root.w,
					h: this.root.h,
					d: this.root.d - current.d
				};

			} else {
				return;
			}
		}
	};

	this.getNode = function (root, w, h, d, string) {
		//	console.log(string);
		if (root.used) {
			return this.getNode(root.top, w, h, d, "top") || this.getNode(root.right, w, h, d, "right");
		} else if ((w <= root.w) && (h <= root.h) && (d <= root.d)) {
			// console.log(root.x, root.y, root.z);
			// console.log(root.w, root.h, root.d);
			packedBags++;
			return root;
		} else {
			return null;
		}
	};

	this.divideTree = function (node, w, h, d, current) {
		node.used = true;
		node.top = {
			x: node.x,
			y: node.y,
			z: node.z + h,
			w: current.w,
			h: node.h - h,
			d: current.d
		};
		node.right = {
			x: node.x + w,
			y: node.y,
			z: node.z,
			w: node.w - w,
			h: node.h,
			d: current.d
		};
		return node;
	}
};