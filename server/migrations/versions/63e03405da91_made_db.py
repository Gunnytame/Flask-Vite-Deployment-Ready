"""made db

Revision ID: 63e03405da91
Revises: a065503ed413
Create Date: 2023-09-21 15:41:36.172268

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '63e03405da91'
down_revision = 'a065503ed413'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('user', schema=None) as batch_op:
        batch_op.add_column(sa.Column('password_hash', sa.String(length=255), nullable=False))
        batch_op.drop_constraint('uq_user_username', type_='unique')
        batch_op.drop_column('password')
        batch_op.drop_column('username')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('user', schema=None) as batch_op:
        batch_op.add_column(sa.Column('username', sa.VARCHAR(length=255), nullable=False))
        batch_op.add_column(sa.Column('password', sa.VARCHAR(length=255), nullable=False))
        batch_op.create_unique_constraint('uq_user_username', ['username'])
        batch_op.drop_column('password_hash')

    # ### end Alembic commands ###