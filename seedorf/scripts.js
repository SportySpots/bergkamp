module.exports = {
  FLUSH_DB: `
from django.core.management import call_command
call_command('flush', interactive=False)
  `,

  CREATE_TEST_USER: `
from seedorf.users.models import User, UserProfile
test_user = User.objects.create_user(username="test@sportyspots.com", email="test@sportyspots.com", name="Test User", password="test123test")
test_user.profile = UserProfile()
test_user.save()  
test_user.profile.save()
  `,

  CREATE_TEST_SPOT: `
from seedorf.spots.tests.factories import SpotFactory
spot = SpotFactory.create(is_verified=True)
spot.save()
spot.address.lat = 52.3727729
spot.address.lng = 4.9055008
spot.address.save()
  `,

  CREATE_TEST_GAME: `
from seedorf.users.tests.factories import UserProfileFactory
from seedorf.games.tests.factories import GameFactory
game = GameFactory.create(
  status='planned',
  is_listed=True,
  is_shareable=True,
  organizer=UserProfileFactory().user
)
game.save()
game.spot.address.lat = 52.3727729
game.spot.address.lng = 4.9055008
game.spot.save()
  `,

  CREATE_CANCELABLE_GAME: `
from seedorf.users.models import User
from seedorf.games.tests.factories import GameListedFactory
test_user = User.objects.first()
game = GameListedFactory.create(
  status='planned',
  organizer=test_user
).save()
  `,

  GET_JWT: `
from rest_framework_jwt.settings import api_settings
from seedorf.users.models import User

jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER
jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER

test_user = User.objects.first()

payload = jwt_payload_handler(test_user)
token = jwt_encode_handler(payload)
print(token)
`
};