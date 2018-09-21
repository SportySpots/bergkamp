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
  `,

  CREATE_TEST_SPOT: `
from seedorf.spots.tests.factories import SpotFactory
SpotFactory.create(is_verified=True).save()
  `,

  CREATE_TEST_GAME: `
from seedorf.games.tests.factories import GameFactory
GameFactory.create(
  status='planned',
  is_listed=True,
  is_shareable=True
).save()
  `

};