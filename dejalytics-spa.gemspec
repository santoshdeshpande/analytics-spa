# coding: utf-8
lib = File.expand_path('../lib', __FILE__)
$LOAD_PATH.unshift(lib) unless $LOAD_PATH.include?(lib)
require 'dejalytics/spa/version'

Gem::Specification.new do |spec|
  spec.name          = "dejalytics-spa"
  spec.version       = Dejalytics::SPA::VERSION
  spec.authors       = ["juwalter"]
  spec.email         = ["juwalter@gmail.com"]
  spec.summary       = "Angular-based single page app as Dejalytics Web Frontend"

  spec.files         = `git ls-files`.split($/)
  spec.executables   = spec.files.grep(%r{^bin/}) { |f| File.basename(f) }
  spec.test_files    = spec.files.grep(%r{^(test|spec|features)/})
  spec.require_paths = ["lib"]

  spec.add_development_dependency "bundler", "~> 1.3"
  spec.add_dependency "sass", [">= 3.2.0"]
  spec.add_dependency "railties", [">= 3.1.0"]
  spec.add_development_dependency "rake"
end

