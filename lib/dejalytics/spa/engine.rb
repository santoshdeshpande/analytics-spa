module Dejalytics
  module SPA
    class Engine < ::Rails::Engine
      isolate_namespace Dejalytics::SPA
      initializer 'dejalytics-spa.assets.precompile' do |app|
        app.config.assets.precompile += %w( vendor/require.js dejalytics-spa.js dejalytics-spa.css )
      end
    end
  end
end

