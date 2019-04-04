require "rails_helper"

RSpec.describe SharesController, :type => :routing do
  describe "routing" do

    it "routes to #create" do
      expect(:post => "/users/1/shares").to route_to("shares#create")
    end

    it "routes to #destroy" do
      expect(:delete => "/users/1/shares/1").to route_to("widgets#destroy", :id => "1")
    end

  end
end
