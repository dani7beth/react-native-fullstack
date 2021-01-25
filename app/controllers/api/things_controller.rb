class Api::ThingsController < ApplicationController
  def index
    render json: Thing.all.order(likes: :desc)
  end

  def likes
    thing = Thing.find(params[:thing_id])
    thing.update(likes: things.likes + 1)
    render json: thing
  end

end
