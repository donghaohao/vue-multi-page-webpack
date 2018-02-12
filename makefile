.PHONY: build
.PHONY: dev

dev:
	@sudo module=${module} node build/dev.js

build:
	@sudo module=${module} node build/build.js
