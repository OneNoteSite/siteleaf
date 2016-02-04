# ~/.GuardFile

notification :off

# Sass/Compass https://github.com/guard/guard-compass
if File.exists?("./config.rb")
  guard :compass do
    watch(%r{(.*)\.s[ac]ss$})
  end
end

# Jammit https://github.com/guard/guard-jammit
guard :jammit,
  :output_folder => '.',
  :config_path => "_assets.yml" do
  watch(%r{(?:css|js)(/.+)\.(?:css|js)}) { |m| m[0] unless m[1] =~ /\/\./ }
end

# Jekyll
guard 'jekyll-plus', :config => ['_config.yml'] do
	watch /.*/
	ignore /_site/
end

# LiveReload https://github.com/guard/guard-livereload
require 'find'
if Find.find(Dir.pwd).detect{|dir|dir=~/.+\.(css|html|js)$/}
  guard 'livereload', :grace_period => 0.5 do
    watch(%r{.+\.(css|html|js)$})
  end
end