# Find all the links on a site

This is a simple program to output all the links on a site, anywhere.  You
can then use it with Google Sheets and some special formulas to find and
audit broken links.

Usage:
```
$ node index.js --url=http://example.org/
```

In order for it to work correctly, use the canonical domain for your site. That is,
if http://example.org/ redirects to http://www.example.org/, use http://www.example.org/.
Rather than implementing edge cases around this, I've tried to leave it simple and
readable.
