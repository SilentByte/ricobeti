all:
	npm install
	gulp build

.PHONY: serve
serve:
	gulp serve

.PHONY: clean
clean:
	rm -rf dist/

