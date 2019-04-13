# Base our image on an official, minimal image of our preferred Ruby
FROM ruby:2.5.3

# Install essential Linux packages
RUN apt-get update && apt-get install -y libpq-dev
RUN curl -sL https://deb.nodesource.com/setup_8.x | bash - \
 && apt-get install -y nodejs

RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - \
 && echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list

RUN apt-get update && apt-get install yarn

# Define where our application will live inside the image
ENV RAILS_ROOT /var/www/herepup
# Set Rails to run in production
ENV RAILS_ENV development 
ENV RACK_ENV development

# Create application home. App server will need the pids dir so just create everything in one shot
RUN mkdir -p $RAILS_ROOT/tmp/pids

# Set our working directory inside the image
WORKDIR $RAILS_ROOT

# Use the Gemfiles as Docker cache markers. Always bundle before copying app src.
# (the src likely changed and we don't want to invalidate Docker's cache too early)
# http://ilikestuffblog.com/2014/01/06/how-to-skip-bundle-install-when-deploying-a-rails-app-to-docker/
COPY Gemfile Gemfile
COPY Gemfile.lock Gemfile.lock
# Finish establishing our Ruby enviornment
RUN gem install bundler && bundle install
# Copy the Rails application into place
COPY . .

EXPOSE 3000

# Define the script we want run once the container boots
# Use the "exec" form of CMD so our script shuts down gracefully on SIGTERM (i.e. `docker stop`)
CMD [ "sh", "config/containers/bash/rails_start.sh" ]