module Dejalytics
  module SPA
    class Engine < ::Rails::Engine
      isolate_namespace Dejalytics::SPA
      initializer "dejalytics-spa.assets.precompile" do |app|
        app.config.assets.precompile += %w( vendor/modernizr.js vendor/require.js )
      end
    end
  end
end

