.PHONY: all
all: build

.PHONY: npm
npm:
	npm install

.PHONY: build
build: npm
	gulp build

.PHONY: serve
serve: npm
	gulp serve

.PHONY: clean
clean:
	rm -rf dist/

